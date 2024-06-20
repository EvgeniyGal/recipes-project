const AddRecipeFormSkeleton = () => (
  <div className="skeleton">
    <div className="skeleton-title skeleton-placeholder"></div>
    <div className="skeleton-subtitle skeleton-placeholder"></div>
    <div className="skeleton-form">
      <div className="skeleton-file-input skeleton-placeholder"></div>
      <div className="skeleton-recipe-info">
        <div className="skeleton-name-wrapper">
          <div className="skeleton-input skeleton-placeholder"></div>
          <div className="skeleton-textarea skeleton-placeholder"></div>
        </div>
        <div className="skeleton-form-group-wrapper">
          <div className="skeleton-select skeleton-placeholder"></div>
          <div className="skeleton-cooking-time skeleton-placeholder"></div>
        </div>
        <div className="skeleton-select skeleton-placeholder"></div>
        <div className="skeleton-ingredients">
          <div className="skeleton-input skeleton-placeholder"></div>
          <div className="skeleton-button skeleton-placeholder"></div>
        </div>
        <div className="skeleton-ingredients-list">
          <div className="skeleton-ingredient-card skeleton-placeholder"></div>
          <div className="skeleton-ingredient-card skeleton-placeholder"></div>
        </div>
        <div className="skeleton-textarea skeleton-placeholder"></div>
        <div className="skeleton-form-actions">
          <div className="skeleton-button skeleton-placeholder"></div>
          <div className="skeleton-button skeleton-placeholder"></div>
        </div>
      </div>
    </div>
  </div>
);

export default AddRecipeFormSkeleton;
