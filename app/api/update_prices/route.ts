import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
    const { error } = await supabase.rpc('update_random_prices')

    if (error) {
        console.error('Error updating prices:', error)
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }

    return NextResponse.json({
        success: true,
        message: '15 random product prices updated',
        timestamp: new Date().toISOString()
    })
}