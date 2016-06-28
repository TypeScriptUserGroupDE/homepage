export default class Config {
    public static github_client_id = process.env.TYPESCRIPTUSERS_GITHUB_CLIENT_ID;
    public static github_client_secret = process.env.TYPESCRIPTUSERS_GITHUB_SECRET;
    public static jwt_secret = process.env.TYPESCRIPTUSERS_JWT_SECRET;
    public static mongodb_port = process.env.TYPESCRIPTUSERS_MONGODB_PORT;
}