require "test_helper"

class CommentMailerTest < ActionMailer::TestCase
  setup do
    @user = users(:no_relationship_user)
    @comment = comments(:one)
  end

  test "new_comment_to_author email" do
    email = CommentMailer.with(record: @comment, recipient: @user).new_comment_to_author

    assert_emails 1 do
      email.deliver_now
    end

    assert_equal [@user.email], email.to
    assert_equal "Nouveau commentaire sur votre recette \"#{@comment.commentable.name}\"", email.subject
    assert_match @comment.content, email.body.encoded
  end

  test "new_comment_to_commenter email" do
    email = CommentMailer.with(record: @comment, recipient: @user).new_comment_to_commenter

    assert_emails 1 do
      email.deliver_now
    end

    assert_equal [@user.email], email.to
    assert_equal "Nouveau commentaire sur la recette \"#{@comment.commentable.name}\"", email.subject
    assert_match @comment.content, email.body.encoded
  end
end
