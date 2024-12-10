# Use the official Nginx image as the base
FROM nginx:latest

# Copy your project files into the container
COPY ./ /usr/share/nginx/html

# Expose port 80 to access the project
EXPOSE 80
