export default interface UserMetadataProps {
  avatar_url: string;
  email: string;
  email_verified?: boolean;
  full_name: string;
  name?: string;
  phone_verified?: boolean;
  picture?: string;
  provider_id?: number;
  sub?: number;
}
