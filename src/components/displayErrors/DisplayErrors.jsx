import "./displayErrors.css";

function DisplayErrors({ errors }) {
  return (
    <div className="errors-container">
      {
        // If length of errors is greater than 0 => draw errors
        errors.length != 0 ? (
          <ul className="errors-list">
            {errors.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : null
      }
    </div>
  );
}

export default DisplayErrors;
