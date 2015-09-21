posts_dir = "_posts"

desc "create a new post"
task :post, :title do |t, args|
    if args.title
        title = args.title
    else
        puts "Please provide a title for the post."
        next
    end
    mkdir_p "#{posts_dir}"
    filename = "#{posts_dir}/#{Time.now.strftime("%Y-%m-%d")}-#{title.downcase.gsub(/[^\w]+/, "-")}.md"
    puts "Creating a new post: #{filename}"
    File.open(filename, "w") do |f|
        f << <<-EOS.gsub(/^        /, "")
        ---
        date: #{Time.new.strftime("%Y-%m-%d %H:%M")}
        title: "#{title}"
        ---
        EOS
    end
end