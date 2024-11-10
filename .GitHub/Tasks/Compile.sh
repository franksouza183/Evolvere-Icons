#!/usr/bin/env sh


deno compile        \
    --allow-write   \
    --allow-read    \
    --allow-run     \
    --target 'x86_64-unknown-linux-gnu'     \
    --output 'Tools/Colorizer-AMD64'        \
    Tools/Colorizer/mod.ts


deno compile        \
    --allow-write   \
    --allow-read    \
    --allow-run     \
    --target 'aarch64-unknown-linux-gnu'    \
    --output 'Tools/Colorizer-ARM64'        \
    Tools/Colorizer/mod.ts
