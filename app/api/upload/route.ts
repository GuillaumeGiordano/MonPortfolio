import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const data = await request.formData()

    console.log(data)

    const image: File | null = data.get('image') as unknown as File
    // const title = data.get('title')
    // const mission = data.get('mission')
    // const description = data.get('description')
    // const languages = data.get('languages')
    // const url = data.get('url')


    console.log(image)

    if (!image) {
        return NextResponse.json({ success: false })
    }

    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // With the file data in the buffer, you can do whatever you want with it.
    // For this, we'll just write it to the filesystem in a new location
    const path = `./public/projects/essai_${image.name}`
    await writeFile(path, buffer)
    console.log(`open ${path} to see the uploaded file`)

    return NextResponse.json({ success: true })
}
