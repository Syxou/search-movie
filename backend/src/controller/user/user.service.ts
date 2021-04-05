import { OAuth2Client } from "google-auth-library";
import { User } from "./User.entity";
const client = new OAuth2Client('1005266927467-r75m0g9pn25q1vkob3hls1h1hvrq4981.apps.googleusercontent.com');

export const authGoogle = async (token: string): Promise<User | number> => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: '1005266927467-r75m0g9pn25q1vkob3hls1h1hvrq4981.apps.googleusercontent.com'
    });
    const { name, email, picture } = ticket.getPayload();
    const user = await User.findOne({ email });
    try {
        if (!user && email) {
            const newUser = new User();
            newUser.email = email;
            newUser.name = name;
            picture && (newUser.picture = picture);
            const userSaved = newUser.save();
            return userSaved;
        } else {
            return user;
        }
    } catch (error) {
        console.log(error)
        return 500;
    }
}
