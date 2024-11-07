// src/app/Profile/page.tsx

import UserInfo from "./Dashpord";
import InfoModal from "./InfoModal"; // Import the new InfoModal component

function Profile() {
    return (
        <main>
            <InfoModal /> {/* Use the InfoModal component */}
            <UserInfo />
        </main>
    );
}

export default Profile;
