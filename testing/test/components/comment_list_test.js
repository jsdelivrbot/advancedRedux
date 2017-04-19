/**
 * Created by chintan on 11/24/16.
 */
import {renderComponent, expect} from '../test_helper';
import CommentList from '../../src/components/comment-list';

describe('CommentList', () => {
   let component;

    beforeEach(() => {
        const props = { comments: ['New comment', 'Comment 1']};
        component = renderComponent(CommentList, null, props);
    });

    it('shows each LI element for comment', () => {
        expect(component.find('li').length).to.equal(2);
    });

    it('shows each comment that is provided', () => {
        expect(component).to.contain('New comment');
        expect(component).to.contain('Comment 1');
    });
});