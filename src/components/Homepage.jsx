import FileUpload from "./FileUpload";

export default function Homepage() {
  return (
    <div className="main d-flex align-items-md-center align-items-start">
      <div className="d-flex gap-5 align-items-center flex-md-row flex-column">

        {/* left part */}
        <div className="w-100">
          <h1 className="mb-4">Notey</h1>
          <h2 className="mb-4">
            Find it Hard to
            <div class="word-animation">
              <span>Revise</span>
              <span>Study</span>
              <span>Review</span>
              <span>Learn</span>
              <span>Reread</span>
            </div>
            Course Slides?
          </h2>
          <h5 className="mb-4">
            Course Slides are <b>Too Big to Read?</b>
            &nbsp;<b>Upload it!</b> We generate a mind map for you.
          </h5>
          <FileUpload />
        </div>

        {/* right part */}
        <div className="w-100">
          <img
            src="Homepage3.png"
            className="img-fluid float-animation"
            alt="img of a person studying"
          />
        </div>
        
      </div>
    </div>
  );
}
