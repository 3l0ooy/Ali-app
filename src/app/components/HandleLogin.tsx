// src/app/components/HandleLogin.tsx

const HandleLogin = async (username: string, password: string): Promise<string | null> => {
  const credentials = `${username}:${password}`;
  const encodedCredentials = btoa(credentials);

  try {
      const response = await fetch("https://learn.reboot01.com/api/auth/signin", {
          method: "POST",
          headers: {
              Authorization: `Basic ${encodedCredentials}`,
              "Content-Type": "application/json",
          },
      });

      if (response.ok) {
          const token = await response.text();
          if (token) {
              const cleanToken = token.replace(/^"(.*)"$/, "$1");
              localStorage.setItem("jwt", cleanToken);
              console.log(cleanToken)
              return null; // Indicate success
          } else {
              return "Login successful, but no token received.";
          }
      } else {
          const errorText = await response.text();
          return errorText; // Return the error message from the response
      }
  } catch (error) {
      console.error("Error during login:", error);
      return "An error occurred. Please try again."; // Return error message
  }
};

export default HandleLogin;
