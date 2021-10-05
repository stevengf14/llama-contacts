export default function Header(props){

    const type = (props.type) ? props.type : 'is-success'

    return (
        <section className={`hero ${type}`}>
            <div className="hero-body">
                <p className="title">
                    {props.title}
                </p>
                <p className="subtitle">
                    {props.subtitle}
                </p>
            </div>
        </section>
    )
}