const AdminNav = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-secondary shadow-sm px-4">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <a className="nav-link active" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/about">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/contact">Contact</a>
                        </li>
                        </ul>
                        <span className="navbar-text text-white">
                        Admin Panel
                        </span>
                    </div>
                    </nav>
    );
}
export default AdminNav;