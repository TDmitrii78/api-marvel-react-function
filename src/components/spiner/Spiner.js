import "./spiner.css";

const Spiner = () => {
    return (
        <div className="spiner">
            <div className="loader">
                <div className="face">
                    <div className="circle"></div>
                </div>
                <div className="face">
                    <div className="circle"></div>
                </div>
            </div>
        </div>
    );
}

export default Spiner;