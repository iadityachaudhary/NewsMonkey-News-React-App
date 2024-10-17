import React from 'react';

const NewsItem = ({ title, description, imageURL, newsURL, author, date, source }) => {
  return (
    <div>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
          <span className="badge rounded-pill bg-danger">{source}</span>
        </div>
        <img
          src={!imageURL ? "https://bsmedia.business-standard.com/_media/bs/img/article/2024-10/12/thumb/featurecrop/400X400/1728729145-7859.jpg" : imageURL}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text">
            <small className="text-muted">
              By {author ? author : "Unknown"} on {new Date(date).toGMTString()}
            </small>
          </p>
          <a href={newsURL} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
