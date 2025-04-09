"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);

  // Admin form states
  const [newUser, setNewUser] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("user");

  // General settings
  const [openingTime, setOpeningTime] = useState("09:00");
  const [closingTime, setClosingTime] = useState("21:00");

  // Password change
  const [currentPassword, setCurrentPassword] = useState("");
  const [updatedPassword, setUpdatedPassword] = useState("");

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("auth");
    if (!isAuthenticated) {
      router.push("/login");
    }
    const role = localStorage.getItem("role");
    setUserRole(role);
  }, []);

  const handleAddUser = () => {
    alert(`User '${newUser}' with role '${newRole}' added!`);
    setNewUser("");
    setNewPassword("");
    setNewRole("user");
  };

  const handleTimeUpdate = () => {
    alert(`Updated restaurant hours: ${openingTime} - ${closingTime}`);
  };

  const handleChangePassword = () => {
    alert("Password changed!");
    setCurrentPassword("");
    setUpdatedPassword("");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-10">
      <h1 className="text-3xl font-bold">Settings</h1>

      {userRole === "admin" && (
        <Card>
          <CardContent className="space-y-6 py-6">
            <h2 className="text-xl font-semibold">User Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Username</Label>
                <Input
                  placeholder="New username"
                  value={newUser}
                  onChange={(e) => setNewUser(e.target.value)}
                />
              </div>
              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="Temporary password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div>
                <Label>Role</Label>
                <select
                  className="w-full border border-gray-300 rounded px-2 py-2"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <Button onClick={handleAddUser}>Add User</Button>
          </CardContent>
        </Card>
      )}

      {/* General Settings - Shown to both admin and user */}
      <Card>
        <CardContent className="space-y-6 py-6">
          <h2 className="text-xl font-semibold">Restaurant Hours</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Opening Time</Label>
              <Input
                type="time"
                value={openingTime}
                onChange={(e) => setOpeningTime(e.target.value)}
              />
            </div>
            <div>
              <Label>Closing Time</Label>
              <Input
                type="time"
                value={closingTime}
                onChange={(e) => setClosingTime(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={handleTimeUpdate}>Update Hours</Button>
        </CardContent>
      </Card>

      {/* Change Password - Shown to both admin and user */}
      <Card>
        <CardContent className="space-y-6 py-6">
          <h2 className="text-xl font-semibold">Change Password</h2>
          <div className="space-y-4">
            <div>
              <Label>Current Password</Label>
              <Input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div>
              <Label>New Password</Label>
              <Input
                type="password"
                value={updatedPassword}
                onChange={(e) => setUpdatedPassword(e.target.value)}
              />
            </div>
            <Button onClick={handleChangePassword}>Change Password</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
