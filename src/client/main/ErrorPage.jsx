import { useParams } from "react-router-dom";

export default function ErrorPage() {
  const { error } = useParams();
  return <p>Invalid endpoint. The page you requested does not exist</p>;
}