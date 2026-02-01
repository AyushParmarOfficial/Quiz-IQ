export default function QuestionHeading({className = " ", children }) {
    return (
        <div className={className}>
            <h3 className="text-lg">{children}</h3>
        </div>
    );
}
