FROM postgres:13

# Set environment variables
ENV POSTGRES_USER sprinkle
ENV POSTGRES_PASSWORD tinkles
ENV POSTGRES_DB sprinklers

# Copy the SQL script to the Docker container
COPY init.sql /docker-entrypoint-initdb.d/