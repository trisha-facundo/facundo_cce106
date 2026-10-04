import { Platform } from 'react-native';

// The only place the API address is set.
// Android emulator: leave USE_PHYSICAL_PHONE = false (10.0.2.2 is the emulator's name for your PC).
// Physical Android phone (Expo Go): set USE_PHYSICAL_PHONE = true and put your PC's Wi-Fi IPv4 in PC_LAN_IP
// (run `ipconfig` to find it). The phone and PC must be on the same Wi-Fi.
const USE_PHYSICAL_PHONE = true;
const PC_LAN_IP = '192.168.88.240';
const PORT = 3000;

const host = Platform.OS === 'android' ? (USE_PHYSICAL_PHONE ? PC_LAN_IP : '10.0.2.2') : 'localhost';

export const API_BASE_URL = `http://${host}:${PORT}`;

// Endpoints (Express server in /server):
// POST /login  { email, password } -> { token, user }
// GET /students       -> [ { id, name, email, course } ]
// GET /students/{id}  -> { id, name, email, course }  (404 if not found)
// GET /profile        -> { id, name, email, role }
// All endpoints except /login need the header  Authorization: Bearer <token>.
