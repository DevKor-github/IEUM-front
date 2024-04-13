import '../../assets/styles/dropdown.css';

function Dropdown() {
  return (
    <div className="container">
      <div className='marker-line' />
      <div className="row">
        <button className="category-button">
          <span>서울</span>
        </button>
        <button className="category-button">
          <span>경기</span>
        </button>
        <button className="category-button">
          <span>인천</span>
        </button>
      </div>
      <div className="row">
        <button className="category-button">
          <span>제주</span>
        </button>
        <button className="category-button">
          <span>경상</span>
        </button>
        <button className="category-button">
          <span>충청</span>
        </button>
      </div>
      <div className="row">
        <button className="category-button">
          <span>부산</span>
        </button>
        <button className="category-button">
          <span>강원</span>
        </button>
        <button className="category-button">
          <span>전라</span>
        </button>
      </div>
    </div>
  );
}

export default Dropdown;
