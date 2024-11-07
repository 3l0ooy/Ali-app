// pages/api/user.js
export default async function handler(req: { headers: { authorization: string; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error?: string; errors?: any; }): void; new(): any; }; }; }) {
    const jwt = req.headers.authorization?.split(' ')[1];

    if (!jwt || jwt.split('.').length !== 3) {
        return res.status(401).json({ error: 'Invalid Token' });
    }

    try {
        const response = await fetch(
            "https://learn.reboot01.com/api/graphql-engine/v1/graphql",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: `
                        {
                            user {
                                firstName
                                lastName
                                id
                                login
                                email
                                campus
                            }
                        }
                    `,
                }),
            }
        );

        if (!response.ok) {
            return res.status(500).json({ error: 'Failed to fetch user data.' });
        }

        const result = await response.json();

        if (result.errors) {
            return res.status(400).json({ errors: result.errors });
        }

        res.status(200).json(result.data.user);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user info' });
    }
}
