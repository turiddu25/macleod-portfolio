// File: pages/api/revalidate.ts

import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'
import type { NextApiRequest, NextApiResponse } from 'next'
import { type SanityDocument } from 'next-sanity'
import type { ParsedBody } from 'next-sanity/webhook'

export const config = {
  api: {
    // Next.js will by default parse the body, which can lead to invalid signatures.
    bodyParser: false,
  },
}

/**
 * Reads the raw request body from the request.
 */
async function readBody(readable: NextApiRequest): Promise<string> {
  const chunks = []
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks).toString('utf8')
}

/**
 * Parses the request body and verifies the webhook signature.
 */
async function parseBody<Body = SanityDocument>(
  req: NextApiRequest,
  secret?: string,
): Promise<ParsedBody<Body>> {
  let signature = req.headers[SIGNATURE_HEADER_NAME]
  if (Array.isArray(signature)) {
    signature = signature[0]
  }
  if (!signature) {
    console.error('Missing signature header')
    return { body: null, isValidSignature: null }
  }

  const body = await readBody(req)
  const isValidSignature = secret
    ? await isValidSignature(body, signature, secret.trim())
    : null

  return {
    body: body.trim() ? JSON.parse(body) : null,
    isValidSignature,
  }
}

/**
 * The main API handler for the Sanity webhook.
 */
export default async function revalidate(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { body, isValidSignature } = await parseBody(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    )

    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' })
    }

    if (!isValidSignature) {
      const message = 'Invalid signature'
      console.log(message)
      return res.status(401).send(message)
    }

    if (!body?._type) {
      return res.status(400).json({ message: 'Bad request: Missing _type' })
    }

    // Determine which path to revalidate based on the document type
    const staleRoutes = queryStaleRoutes(body)

    if (staleRoutes.length === 0) {
      return res.status(200).json({ message: 'No routes to revalidate' })
    }
    
    // Trigger revalidation for the identified path
    await Promise.all(staleRoutes.map((route) => res.revalidate(route)))

    const updatedRoutes = `Updated routes: ${staleRoutes.join(', ')}`
    console.log(updatedRoutes)
    return res.status(200).send(updatedRoutes)
  } catch (err) {
    console.error('Error in revalidate handler:', err)
    return res.status(500).send(err.message)
  }
}

/**
 * Determines which page(s) to revalidate based on the changed document type.
 * For your portfolio, any change to a 'track' or 'settings' should update the homepage.
 */
function queryStaleRoutes(body: SanityDocument): string[] {
  const { _type } = body

  switch (_type) {
    case 'track':
      // Changes to tracks affect the homepage slider.
      return ['/']
    case 'settings':
      // Changes to settings affect the homepage (hero, contact sections).
      return ['/']
    default:
      // If the document type is not one we care about, don't revalidate anything.
      console.warn(`Webhook received for unhandled type: ${_type}`)
      return []
  }
}