require 'rails_helper'

describe "Sign up flow" do

  before :each do
    visit new_user_registration_path
  end

  describe "confirmable" do

    before do
      fill_in 'Username', with: 'example'
      fill_in 'Email', with: 'user@example.com'
      fill_in 'Password', with: 'helloworld'
      fill_in 'Password confirmation', with: 'helloworld'
      click_button 'Sign up'
    end

    it "sends confirmation email when user signs up" do
      user = User.last
      expect(user.confirmation_sent_at).to be <= Time.new 
    end
  end

  describe "unconfirmable" do
    before do
      @user = create(:user)
    end

    it "invalid email" do
      fill_in 'Username', with: 'example'
      fill_in 'Email', with: 'user.example.com'
      fill_in 'Password', with: 'helloworld'
      fill_in 'Password confirmation', with: 'helloworld'
      click_button 'Sign up'
      expect(page).to have_content('Sign up')
    end

    it "doesn't allow sign up with duplicate email" do
      fill_in 'Username', with: 'example'
      fill_in 'Email', with: @user.email
      fill_in 'Password', with: 'helloworld'
      fill_in 'Password confirmation', with: 'helloworld'
      click_button "Sign up"
      expect(page).to have_content("Email has already been taken")
    end
  end
end