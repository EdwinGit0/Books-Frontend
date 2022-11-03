import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function BookCreate() {
  const router = useRouter();
  const [bookTitle, setBookTitle] = useState("");
  const [errors, setErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  async function handelSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          title: bookTitle,
        }),
      }
    );

    if (res.ok) {
      setErrors([]);
      setBookTitle("");
      return router.push("/libros");
    }

    const data = await res.json();
    setErrors(data.errors);

    setSubmitting(false);
  }
  return (
    <>
      <h1>Book Create</h1>
      <form onSubmit={handelSubmit}>
        <input
          type="text"
          onChange={(e) => setBookTitle(e.target.value)}
          value={bookTitle}
          disabled={submitting}
          data-cy="input-book-title"
        />
        <button disabled={submitting} data-cy="button-submit-book">
          {submitting ? "Enviando..." : "Enviar"}
        </button>
        {errors.title && (
          <span style={{ color: "red", display: "block" }}>{errors.title}</span>
        )}
      </form>

      <br />
      <Link href={"/libros"}>Book List</Link>
    </>
  );
}
