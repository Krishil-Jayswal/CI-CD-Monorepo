import {app} from "./index.js";

app.listen(3000, (err) => {
    if (err) {
        console.error("Error in starting server", err);
        process.exit(1);
    }

    console.log("Server started on port 3000");
});
