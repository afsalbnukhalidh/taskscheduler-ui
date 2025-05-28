import { useNavigate, Link } from 'react-router-dom';

const AdminNav = () => {
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-secondary shadow-sm px-4 position-sticky top-0">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link active" href="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/UserCreation">Users</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/contact">Contact</Link>
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