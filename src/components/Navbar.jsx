function Navbar(props) {
    const { title, description } = props;
        return (
            <nav>
                <h1>{title}</h1>
                <p>{description}</p>
            </nav>
        );
}

export default Navbar;