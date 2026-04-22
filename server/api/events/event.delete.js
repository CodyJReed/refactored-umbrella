import UserEvent from "../../utils/models/user-event";

export default defineEventHandler(async (event) => {
  const { id } = getQuery(event);
  await dbConnect();
  try {
    await UserEvent.deleteOne({
      _id: id,
    });
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error.",
    });
  }
});
