import useImgInfo from "./contexts/ImgContext";

function App() {
  const { imgs, setImgs, loading, setLoading, page, setPage, query } =
    useImgInfo();

  useEffect(() => {
    if (query === "") {
      return;
    }

    async function fetchImage() {
      const accessKey = `zPFdKCaSiw5vyBpka6VBvM6ffJrOP_9CsSjIW_JCGQ8`;

      setLoading(true);

      try {
        const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}&page=${page}&per_page=3`;
        const response = await fetch(url);

        const data = await response.json();

        setImgs((prevImgs) => [...prevImgs, ...data.results]);
      } catch (error) {
        throw new Error("Something went wrong.. Image not retrieved");
      } finally {
        setLoading(false);
      }
    }

    fetchImage();
  }, [query, page, setImgs, setLoading]);

  useEffect(() => {
    function scrollChecker() {
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
        setPage((prev) => prev + 1);
      }
    }

    window.addEventListener("scroll", scrollChecker);
    return () => {
      window.removeEventListener("scroll", scrollChecker);
    };
  }, [setPage]);

  return (
    <div className="w-full h-screen bg-custom-blue">
      <div className="flex flex-wrap flex-col gap-y-3 items-center justify-center">
        <ul>
          {imgs.map((img) => (
            <li key={img.id}>
              <img
                src={img.urls.small}
                alt={img.alt_description}
                width="400px"
                className="rounded-lg shadow-lg"
              />
            </li>
          ))}
        </ul>

        {loading && (
          <div className="font-semibold text-3xl text-orange-700">
            Loading...
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
