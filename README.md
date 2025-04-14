# Jekyll Project for Justin Edwards

This is a Jekyll project for Justin Edwards' professional homepage. The site includes information about his research, publications, teaching, and community involvement.

## Project Structure

- **_config.yml**: Configuration settings for the Jekyll site, including site title and description.
- **_includes/**: Contains reusable HTML snippets for the site.
  - **footer.html**: Footer section of the site.
  - **head.html**: Head section with meta tags and stylesheets.
  - **navigation.html**: Navigation menu for the site.
- **_layouts/**: Contains layout templates for the site.
  - **default.html**: Main layout template defining the structure of the pages.
- **assets/css/**: Contains CSS styles for the site.
  - **style.css**: Styles defining the visual appearance of the HTML elements.
- **community.html**: Standalone page providing information about community involvement.
- **index.html**: Homepage of the site.
- **publications.html**: Lists the publications of Justin Edwards.
- **teaching.html**: Provides information about teaching and supervision activities.
- **Gemfile**: Specifies the Ruby gems required for the Jekyll project.

## Setup Instructions

1. **Install Ruby**: Ensure you have Ruby installed on your machine. You can download it from [ruby-lang.org](https://www.ruby-lang.org/en/downloads/).

2. **Install Bundler**: If you don't have Bundler installed, you can install it by running:
   ```
   gem install bundler
   ```

3. **Install Jekyll**: Install Jekyll by running:
   ```
   gem install jekyll
   ```

4. **Install Dependencies**: Navigate to the project directory and run:
   ```
   bundle install
   ```

5. **Run the Jekyll Server**: Start the Jekyll server with:
   ```
   bundle exec jekyll serve
   ```

6. **Access the Site**: Open your web browser and go to `http://localhost:4000` to view the site.

## Usage

You can modify the content in the `index.html`, `community.html`, `publications.html`, and `teaching.html` files to update the information displayed on the site. The styles can be adjusted in the `assets/css/style.css` file. 

For any additional features or changes, consider modifying the layout files in the `_layouts` directory or the included HTML snippets in the `_includes` directory.