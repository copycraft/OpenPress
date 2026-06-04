interface Props {
    isLoggedIn: boolean;
}

export default function Topbar({ isLoggedIn }: Props) {
    if (!isLoggedIn) return null;

    return (
        <nav data-component="topbar">
            <span>openpress</span>
            <div>
                <a href="/op-admin/dashboard">dashboard</a>
                <a href="/op-admin/pages">pages</a>
                <a href="/op-admin/media">media</a>
                <a href="/op-admin/settings">settings</a>
            </div>
        </nav>
    );
}