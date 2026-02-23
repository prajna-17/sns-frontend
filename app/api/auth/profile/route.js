import { getAuthUser } from "@/app/lib/auth";
import { connectDB } from "@/app/lib/db";
import User from "@/app/models/User";



export async function GET(req) {
  try {

    await connectDB();

    const authUser = await getAuthUser(req);
    
    const user = await User.findById(authUser.id).select("-password").lean();

    // return Response.json({ users, authUser }, { status: 200 });
    return Response.json(user, { status: 200 });

  } catch (error) {
    return Response.json(
      { message: error.message },
      { status: 500 }
    );
  }
}