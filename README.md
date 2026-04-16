# Agarwal Events & Wedding Planners

A luxury wedding and event planning website built with React, Vite, Tailwind CSS, and Supabase.

---

## How to Run the Project

### Step 1: Install Dependencies

Open a terminal in the project folder and run:

```bash
npm install
```

This installs all required packages (React, Vite, Tailwind, Framer Motion, Supabase, etc.).

---

### Step 2: Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project (or use an existing one).
2. In your Supabase project, open **SQL Editor**.
3. Copy the contents of `supabase/schema.sql` from this project.
4. Paste and run the SQL to create all tables and RLS policies.
5. Go to **Settings → API** and copy:
   - **Project URL** → you will use this as `VITE_SUPABASE_URL`
   - **anon public key** → you will use this as `VITE_SUPABASE_ANON_KEY`
6. Go to **Authentication → Users** and create a new user (email + password) for admin login.

---

### Step 3: Set Up Cloudinary (for image uploads)

1. Go to [cloudinary.com](https://cloudinary.com) and create an account or log in.
2. From the dashboard, note your **Cloud Name**.
3. Go to **Settings → Upload** and create an **unsigned upload preset**.
4. You will use:
   - **Cloud Name** → `VITE_CLOUDINARY_CLOUD_NAME`
   - **Upload Preset name** → `VITE_CLOUDINARY_UPLOAD_PRESET`

---

### Step 4: Create the `.env` File

1. Copy the example file:

   ```bash
   cp .env.example .env
   ```

2. Open `.env` and fill in your values:

   ```
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key-here
   VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
   VITE_CLOUDINARY_UPLOAD_PRESET=your-unsigned-upload-preset-name
   ```

3. Save the file. **Do not commit `.env` to git** (it is already in `.gitignore`).

---

### Step 5: Run the Development Server

```bash
npm run dev
```

The app will start at `http://localhost:5173` (or the next available port).

---

### Step 6: Build for Production

To create a production build:

```bash
npm run build
```

The output will be in the `dist/` folder. You can deploy this to Vercel, Netlify, or any static host.

---

### Step 7: Preview the Production Build Locally

```bash
npm run preview
```

This serves the built files locally so you can test the production build.

---

## Quick Reference

| Command        | Description                          |
|----------------|--------------------------------------|
| `npm install`  | Install dependencies                 |
| `npm run dev`  | Start development server             |
| `npm run build`| Build for production                 |
| `npm run preview` | Preview production build locally |

---

## Admin Access

- **URL:** `http://localhost:5173/admin`
- **Login:** Use the email and password of the user you created in Supabase (Step 2.6).
- Unauthenticated users are redirected to `/admin/login`.

---

## Tech Stack

- **Frontend:** Vite, React, JavaScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Routing:** React Router v6
- **Backend:** Supabase (auth, database)
- **Images:** Cloudinary
- **Forms:** react-hook-form
- **Toasts:** react-hot-toast
