import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AuthContext } from "../../context/AuthContext";
import { postResume } from "../../apicalls";
import { toast } from "react-toastify";

const ResumeUpload = () => {
  const { token } = useContext(AuthContext);
  const [isLoading, setisLoading] = useState(false);
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      maxFiles: 1,
      accept: {
        "application/pdf": [".pdf"],
      },
    });

  console.log(acceptedFiles);

  return (
    <div className="resumeUploadContainer">
      <h2>Upload Your Resume</h2>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <div
          className={`dropzoneContent ${
            isDragActive ? "dropActive" : "dropInactive"
          }`}
        >
          {isDragActive ? (
            <p>Drop your Resume here ...</p>
          ) : acceptedFiles.length && acceptedFiles[0] ? (
            <p>{acceptedFiles[0].path}</p>
          ) : (
            <p>Drag 'n' drop your Resume, or click to select Resume</p>
          )}
        </div>
      </div>

      <button
        className="uploadButton"
        onClick={() => {
          if (acceptedFiles.length) {
            setisLoading(true);
            postResume(acceptedFiles[0], token, toast, setisLoading);
          } else {
            toast("Select a single PDF file");
          }
        }}
      >
        <FontAwesomeIcon icon={faCloudArrowUp} />
        <p>{isLoading ? "Loading..." : "Upload"}</p>
      </button>
    </div>
  );
};

export default ResumeUpload;
