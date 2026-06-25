import { defineConfig } from "vitest/config";

export default defineConfig({
    resolve: {
        tsconfigPaths: true,
    },
    test: {
        environment: "node",
        globals: false,
        include: ["test/**/*.test.ts"],
        coverage: {
            provider: "v8",
            reporter: ["text", "html", "lcov", "json-summary"],
            include: ["src/**/*.ts"],
            exclude: [
                "node_modules/**",
                ".aws-sam/**",
                "dist/**",
                "src/infraestructure/aws/lambda/**",
                "**/*.test.ts",
                "**/*.config.ts",
                "**/*.d.ts",
            ],
            // thresholds: {
            //     lines: 80,
            //     functions: 80,
            //     branches: 80,
            //     statements: 80,
            // },
        },
    },
});
