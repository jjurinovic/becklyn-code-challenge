import { redirect } from 'next/navigation';

export default function Home() {
  // redirect to career page where is content
  redirect('/career');
  return <></>;
}
