module.exports = [
    {
        "name": "default",
        "type": "postgres",
        "host": process.env.HOST,
        "port": 5432,
        "username": "postgres",
        "password": "root",
        "database": "terminal",
        "synchronize": true,
        "logging": false,
        "entities": [
            "dist/app/models/**/*.js"
        ]
    }
]