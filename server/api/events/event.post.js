import UserEvent from "../../utils/models/user-event";
import { checkUserSession } from "~~/server/utils";

export default defineEventHandler(async (event) => {
  try {
    await dbConnect();
    const body = await readBody(event);
    const session = await checkUserSession(event);

    // Validate
    const userEvent = new UserEvent({
      ...body,
      owner: session.id,
    });

    await userEvent.save();

    return {
      status: 201,
      message: "Event created.",
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || error.message,
      data: error.data || null,
    });
  }
});
