import bcrypt from "bcrypt";
import User from "../../utils/models/user";
import { dbConnect } from "~~/server/utils/db";
import { SignUpSchema } from "~~/server/utils/schemas/signup-schema";

export default defineEventHandler(async (event) => {
  try {
    await dbConnect();
    const body = await readBody(event);
    const { email, password } = body;

    // Validate eith Yup
    try {
      await SignUpSchema.validate(body, { abortEarly: false });
    } catch (validationError) {
      throw createError({
        statusCode: 400,
        statusMessage: "Validation failed",
        data: {
          errorsArray: validationError.errors,
        },
      });
    }
    const user = await User.findOne({
      email,
    });

    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: "User does not exists.",
      });
    }

    // Hash password
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
         throw createError({
        statusCode: 401,
        statusMessage: "Invalid email or password",
      });
    }

    // Set new user session
    await setUserSession(event, {
      user: {
        id: user._id.toString(),
        email: user.email,
      },
    });

    return {
      success: true,
      user: {
        id: user._id.toString(),
        email: user.email,
      },
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || error.message,
      data: error.data || null,
    });
  }
});
