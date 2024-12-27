import NewPostForm from '../components/NewPostForm';
import Navbar from '../components/Navbar';

export default function NewPost() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        <NewPostForm />
      </div>
    </div>
  );
}
