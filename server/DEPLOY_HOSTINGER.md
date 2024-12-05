# Deploying to Hostinger Cloud

## Prerequisites
1. A Hostinger Cloud Hosting account
2. SSH access to your Hostinger server
3. Node.js installed on your Hostinger server

## Deployment Steps

### 1. Build Your Application
```bash
# On your local machine
cd server
./scripts/build.sh
```

### 2. Configure Hostinger Cloud Hosting
1. Log in to your Hostinger Control Panel
2. Go to your Cloud Hosting dashboard
3. Note down your server's IP address and SSH credentials

### 3. Upload Files to Hostinger
```bash
# Replace with your Hostinger server details
scp -r dist/* username@your-server-ip:/home/username/app
```

### 4. SSH Into Your Server
```bash
ssh username@your-server-ip
```

### 5. Install Dependencies and Start the App
```bash
cd ~/app
npm install --production
pm2 start ecosystem.config.js --env production
```

### 6. Configure Nginx (if not already configured)
```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/habibi-stay

# Add the following configuration:
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Create symlink
sudo ln -s /etc/nginx/sites-available/habibi-stay /etc/nginx/sites-enabled/

# Test and restart Nginx
sudo nginx -t
sudo systemctl restart nginx
```

### 7. Set Up SSL (Optional but Recommended)
```bash
sudo certbot --nginx -d your-domain.com
```

## Environment Variables
Make sure to update your `.env` file on the server with the correct production values:
- MONGODB_URI: Your MongoDB Atlas connection string
- JWT_SECRET: A strong secret key
- ALLOWED_ORIGINS: Your frontend domain
- Other environment-specific variables

## Monitoring
- Monitor your application using PM2:
  ```bash
  pm2 status
  pm2 logs
  ```
- Check Nginx logs:
  ```bash
  sudo tail -f /var/log/nginx/access.log
  sudo tail -f /var/log/nginx/error.log
  ```

## Troubleshooting
1. If the app doesn't start, check PM2 logs:
   ```bash
   pm2 logs habibi-stay
   ```
2. If you can't connect, verify Nginx configuration:
   ```bash
   sudo nginx -t
   ```
3. Check firewall settings:
   ```bash
   sudo ufw status
   ```
