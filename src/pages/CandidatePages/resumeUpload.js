import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { AuthContext } from "../../context/AuthContext";
import { postResume } from "../../apicalls";

const ResumeUpload = () => {
  const { token } = useContext(AuthContext);
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({ maxFiles: 1 });

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
          ) : (
            <p>Drag 'n' drop your Resume, or click to select Resume</p>
          )}
        </div>
      </div>

      <button
        className="uploadButton"
        onClick={() => {
          postResume(token, acceptedFiles[0]);
        }}
      >
        <FontAwesomeIcon icon={faCloudArrowUp} />
        <p>Upload</p>
      </button>
    </div>
  );
};

export default ResumeUpload;
