import Quiz from '../components/Quiz';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div>
      <Navbar />
      <h1>Quiz Application</h1>
      <Quiz />
    </div>
  );
}