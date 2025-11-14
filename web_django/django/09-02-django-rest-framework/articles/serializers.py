from rest_framework import serializers
from .models import Article, Comment


class ArticleSerializer(serializers.ModelSerializer):
    
    class CommentDetailSerializer(serializers.ModelSerializer):
        class Meta:
            model = Comment
            fields = ('id', 'content',)

    # 역참조 매니저 이름으로 응답에 제공할 필드를 재정의
    # (주의! 역참조 매니저 이름이 아니면 동작하지 않음)

    # 만약 comment_set이 아닌 다른 이름으로 사용하고 싶다면
    # models.py에서 외래키 필드에서 related_name 설정으로 변경하고,
    # 여기서도 related_name의 값으로 변경해야 한다.
    comment_set = CommentDetailSerializer(many=True, read_only=True)

    # 댓글 개수를 제공할 새로운 읽기 전용 필드를 정의
    num_of_comments = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = '__all__'

    def get_num_of_comments(self, obj):
        # 왜 이런 함수를 호출하는 구조로 되었을까?
            # gpt의 응답 결과를 받아서 반환
            # 여러가지
            # 코드들이
            # 작성 됨
            # 그 결과를 새로운 필드에 반환 하는 구조...
        return obj.num_of_comments



class ArticleListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Article
        fields = ('id', 'title', 'content',)


class CommentSerializer(serializers.ModelSerializer):

    # 게시글의 제목만 직렬화 해주는 도구
    class ArticleTitleSerializer(serializers.ModelSerializer):
        class Meta:
            model = Article
            fields = ('id', 'title',)

    # article 필드에 대한 데이터 재정의(덮어쓰기)
    article = ArticleTitleSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = '__all__'
        # read_only_fields = ('article',)
