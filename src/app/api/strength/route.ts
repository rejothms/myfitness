import { NextResponse } from "next/server";

import { getIntermediate } from "@/lib/fitnessStore";

export async function GET() {
    const imData = getIntermediate();
    return NextResponse.json(imData);
}


/* export async function POST(req: Request) {
    const body = (await req.json()) as EventItem;

    if (!body.title || !body.startAt || !body.owner) {
        return NextResponse.json(
            { message: "Invalid event data" },
            { status: 400 }
        );
    }

    const newEvent: EventItem = {
        ...body,
        createdAt: new Date().toISOString(),
    };

    addEvent(newEvent);

    return NextResponse.json(newEvent, { status: 201 });
} */

