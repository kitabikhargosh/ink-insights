import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const CLOUDINARY_CLOUD_NAME = 'de19jlsgv';
const CLOUDINARY_API_KEY = '835176438542863';

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    });
  }

  try {
    const CLOUDINARY_API_SECRET = Deno.env.get('CLOUDINARY_API_SECRET');
    if (!CLOUDINARY_API_SECRET) {
      throw new Error('Cloudinary API secret not configured');
    }

    // Get the file from the request
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'ink-insights';

    if (!file) {
      return new Response(JSON.stringify({ error: 'No file provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Create form data for Cloudinary
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append('file', file);
    cloudinaryFormData.append('api_key', CLOUDINARY_API_KEY);
    cloudinaryFormData.append('folder', folder);
    cloudinaryFormData.append('timestamp', Math.floor(Date.now() / 1000).toString());

    // Generate signature for secure upload
    const timestamp = Math.floor(Date.now() / 1000);
    const signatureData = `folder=${folder}&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`;
    
    // Simple signature generation (in production, use proper crypto)
    const encoder = new TextEncoder();
    const data = encoder.encode(signatureData);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const signature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    cloudinaryFormData.append('signature', signature);

    // Upload to Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: cloudinaryFormData,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Cloudinary upload failed: ${errorText}`);
    }

    const result = await response.json();

    return new Response(JSON.stringify({ 
      success: true, 
      url: result.secure_url,
      public_id: result.public_id 
    }), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });

  } catch (error) {
    console.error('Upload error:', error);
    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
});