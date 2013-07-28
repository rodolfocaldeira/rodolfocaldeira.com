set :application, "rodolfocaldeira2"

set :user, conf_ssh_user
set :deploy_to, "#{conf_deploy_to}#{application}"

set :copy_exclude, [
    ".idea",
	".sass-cache", 
	".gitignore", 		
	".git", 	
	"bin", 
	"config", 
	"design", 
	"Capfile"
]

ssh_options[:forward_agent] = true

set :deploy_via, :copy
set :scm, :none
set :repository, "."

server conf_server, :app, :web, :db, :primary => true
set :use_sudo, false
set :rewrite_base, "/rodolfocaldeira2/"

before "deploy:finalize_update", "copy_to_prod"

desc "Copies the site to the right place"
task :copy_to_prod do
    puts "#{current_release}"
    run "mv #{current_release}/dist/ #{current_release}/public/"
    run "chmod 755 #{current_release}/public/ -R"

    htaccess = <<-EOF
ErrorDocument 404 /404.html
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase #{rewrite_base}
</IfModule>
EOF
    put htaccess, "#{current_release}/public/.htaccess"
    run "chmod 755 #{current_release}/public/.htaccess"
end