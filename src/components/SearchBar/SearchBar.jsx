import css from './SearchBar.module.css';
import toast, { Toaster } from 'react-hot-toast';

export default function SearchBar({ onSearch }) {
  const notify = () => toast('Write something, please');
  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const search = form.elements.search.value.trim();
    if (form.elements.search.value === '') {
      return notify();
    }
    onSearch(search);
    form.reset();
  };

  return (
    <div>
      <Toaster />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          autoFocus
          placeholder="Enter movie name"
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
